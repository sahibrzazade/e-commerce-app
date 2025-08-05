import { useState } from "react";
import { useTranslation } from "react-i18next";
import AppLayout from "../layouts/AppLayout";
import { OutlinedButton } from "../components/OutlinedButton";
import { useNavigate } from "react-router-dom";
import { reverseThemedBackground, reverseThemedBorder, reverseThemedText, themedBackground, themedBorder, themedText } from "../styles/themeClassNames";
import { getFaqData } from "../data/faqData";

export const Faq = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>("general");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const faqData = getFaqData(t);

  const toggleItem = (itemKey: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemKey)) {
      newOpenItems.delete(itemKey);
    } else {
      newOpenItems.add(itemKey);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <AppLayout>
      <div className="min-h-screen">
        <div
          className={`w-full h-[500px] ${reverseThemedBackground} ${reverseThemedText} bg-cover bg-center flex justify-center items-center`}
        >
          <div className="text-center">
            <h1 className="text-5xl font-bold uppercase mb-4">
              {t("faq.title")}
            </h1>
            <p className="text-xl px-4">
              {t("faq.subtitle")}
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(faqData).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${activeCategory === key
                  ? `${reverseThemedBackground} ${reverseThemedText} ${reverseThemedBorder}`
                  : `${themedBackground} ${themedText} ${themedBorder} cursor-pointer `
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqData[activeCategory].items.map((item, index) => {
                const itemKey = `${activeCategory}-${index}`;
                const isOpen = openItems.has(itemKey);

                return (
                  <div
                    key={itemKey}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(itemKey)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        {item.question}
                      </h3>
                      <div className="flex-shrink-0">
                        <svg
                          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                            }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                    >
                      <div className="px-6 pb-4">
                        <p className="text-gray-700 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="rounded-lg shadow-sm border p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                {t("faq.contact-section.title")}
              </h3>
              <p className="mb-6">
                {t("faq.contact-section.description")}
              </p>
              <div className="flex justify-center">
                <OutlinedButton content={t("navigation.contact")} fontWeight="normal" height={50} width={180} onClick={() => navigate("/contact")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};