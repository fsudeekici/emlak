// src/components/TemplateSelector.jsx
import React from "react";
import { Sparkles } from "lucide-react";

const TemplateSelector = ({ templates, selectedTemplate, setSelectedTemplate }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      {/* Başlık */}
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-800">Tasarım Şablonu Seç</h3>
      </div>

      {/* Şablonlar Grid */}
      <div className="grid sm:grid-cols-3 grid-cols-2 gap-5">
        {templates.map((template, index) => {
          const isSelected = selectedTemplate === index;

          return (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(index)}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 focus:outline-none ${
                isSelected
                  ? "border-blue-500 ring-2 ring-blue-100 shadow-md"
                  : "border-gray-200 hover:border-gray-400 hover:shadow-sm"
              }`}
            >
              {/* Önizleme Alanı */}
              <div
                className="h-24 w-full rounded-xl transition-transform duration-300 group-hover:scale-105"
                style={{
                  background:
                    template.style === "gradient"
                      ? `linear-gradient(135deg, ${template.bgColor}, ${template.secondaryColor})`
                      : template.bgColor,
                }}
              />

              {/* Şablon Adı */}
              <div className="p-3 text-center">
                <p
                  className={`text-sm font-medium tracking-tight ${
                    isSelected ? "text-blue-600" : "text-gray-700 group-hover:text-gray-900"
                  }`}
                >
                  {template.name}
                </p>
              </div>

              {/* Seçili Etiketi */}
              {isSelected && (
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                  Seçili
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;
