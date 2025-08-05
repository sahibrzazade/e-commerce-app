import { FAQCategory } from "../types";
import { TFunction } from "i18next";

export const getFaqData = (t: TFunction): Record<string, FAQCategory> => ({
  general: {
    name: t("faq.categories.general"),
    items: [
      {
        question: t("faq.questions.what-is-cartly"),
        answer: t("faq.questions.what-is-cartly-answer"),
      },
      {
        question: t("faq.questions.how-to-sign-up"),
        answer: t("faq.questions.how-to-sign-up-answer"),
      },
      {
        question: t("faq.questions.how-to-place-order"),
        answer: t("faq.questions.how-to-place-order-answer"),
      },
    ],
  },
  shipping: {
    name: t("faq.categories.shipping"),
    items: [
      {
        question: t("faq.questions.shipping-time"),
        answer: t("faq.questions.shipping-time-answer"),
      },
      {
        question: t("faq.questions.track-order"),
        answer: t("faq.questions.track-order-answer"),
      },
    ],
  },
  returns: {
    name: t("faq.categories.returns"),
    items: [
      {
        question: t("faq.questions.return-policy"),
        answer: t("faq.questions.return-policy-answer"),
      },
      {
        question: t("faq.questions.refund-time"),
        answer: t("faq.questions.refund-time-answer"),
      },
    ],
  },
  products: {
    name: t("faq.categories.products"),
    items: [
      {
        question: t("faq.questions.product-quality"),
        answer: t("faq.questions.product-quality-answer"),
      },
      {
        question: t("faq.questions.care-instructions"),
        answer: t("faq.questions.care-instructions-answer"),
      },
    ],
  },
  account: {
    name: t("faq.categories.account"),
    items: [
      {
        question: t("faq.questions.change-password"),
        answer: t("faq.questions.change-password-answer"),
      },
      {
        question: t("faq.questions.forgot-password"),
        answer: t("faq.questions.forgot-password-answer"),
      },
      {
        question: t("faq.questions.order-history"),
        answer: t("faq.questions.order-history-answer"),
      },
      {
        question: t("faq.questions.contact-support"),
        answer: t("faq.questions.contact-support-answer"),
      },
    ],
  },
});