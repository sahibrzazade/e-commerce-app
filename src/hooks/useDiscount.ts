import { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { DiscountResult } from '../types';
import { showErrorMessage, showSuccessMessage } from '../utils/toastUtils';
import { useCart } from '../contexts/cartContext';
import { useTranslation } from 'react-i18next';

export function useDiscount(): DiscountResult {
  const { t } = useTranslation();
  const { total } = useCart();

  const [discount, setDiscount] = useState<number>(0);
  const [discountedTotal, setDiscountedTotal] = useState<number>(total);
  const [loading, setLoading] = useState<boolean>(false);

  const applyCoupon = async (code: string) => {
    setLoading(true);
    setDiscount(0);
    try {
      const db = getFirestore();
      const couponsRef = collection(db, 'coupons');
      const q = query(couponsRef, where('code', '==', code));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        showErrorMessage(t("shop.invalid-coupon-code"));
        setLoading(false);
        return;
      }
      const coupon = querySnapshot.docs[0].data();
      let discountValue = 0;
      if (coupon.type === 'fixed') {
        discountValue = coupon.discount;
        showSuccessMessage(`${t("shop.coupon-applied")}: $${discountValue} ${t("shop.off")}`);
      } else if (coupon.type === 'percent') {
        discountValue = (total * coupon.discount) / 100;
        showSuccessMessage(`${t("shop.coupon-applied")}: ${coupon.discount}% ${t("shop.off")}`);
      }
      setDiscount(discountValue);
      setDiscountedTotal(Math.max(0, total - discountValue));
    } catch (error) {
      showErrorMessage(t("failed-to-apply-coupon"));
    } finally {
      setLoading(false);
    }
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