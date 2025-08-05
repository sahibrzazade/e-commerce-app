import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { DiscountResult } from '../types';
import { showErrorMessage, showSuccessMessage } from '../utils/toastUtils';
import { useCart } from '../contexts/cartContext';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';

const fetchCoupon = async (code: string) => {
  const db = getFirestore();
  const couponsRef = collection(db, 'coupons');
  const q = query(couponsRef, where('code', '==', code));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error('invalid-coupon-code');
  }

  return querySnapshot.docs[0].data();
};

export function useDiscount(): DiscountResult {
  const { t } = useTranslation();
  const { total } = useCart();

  const [discount, setDiscount] = useState<number>(0);
  const [discountedTotal, setDiscountedTotal] = useState<number>(total);

  const { mutateAsync, isPending: loading } = useMutation({
    mutationFn: fetchCoupon,
    onSuccess: (coupon, code) => {
      let discountValue = 0;

      if (coupon.type === 'fixed') {
        discountValue = coupon.discount;
        showSuccessMessage(`"${code}" ${t("shop.coupon-applied")}: $${discountValue} ${t("shop.off")}`);
      } else if (coupon.type === 'percent') {
        discountValue = (total * coupon.discount) / 100;
        showSuccessMessage(`"${code}" ${t("shop.coupon-applied")}: ${coupon.discount}% ${t("shop.off")}`);
      }

      setDiscount(discountValue);
      setDiscountedTotal(Math.max(0, total - discountValue));
    },
    onError: (error: Error) => {
      const errorMsg =
        error.message === 'invalid-coupon-code'
          ? t('shop.invalid-coupon-code')
          : t('failed-to-apply-coupon');
      showErrorMessage(errorMsg);
    },
  });

  const applyCoupon = async (code: string): Promise<void> => {
    await mutateAsync(code);
  };

  const resetDiscount = () => {
    setDiscount(0);
    setDiscountedTotal(total);
    showErrorMessage(t("shop.coupon-removed"));
  };

  useEffect(() => {
    setDiscountedTotal(Math.max(0, total - discount));
  }, [total, discount]);

  return { discount, discountedTotal, loading, applyCoupon, resetDiscount };
}
