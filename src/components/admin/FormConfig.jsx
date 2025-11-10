export const formConfig = {
  insurance_plans: [
    { name: "plan_name", label: "Plan Name", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "features", label: "Features", type: "list" },
    { name: "order", label: "Order", type: "number" },
    { name: "plan_image", label: "Plan Image", type: "image", required: true },
  ],
  about_us: [
    { name: "order", label: "Order", type: "number" },
    { name: "image", label: "Image", type: "image", required: true },
  ],
  services: [
    { name: "title", label: "Title", type: "text" },
    { name: "order", label: "Order", type: "number" },
    { name: "image", label: "Image", type: "image", required: true },
  ],
  insurance_plans: [
    { name: "title", label: "Title", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "benefits", label: "benefits", type: "list" },
    { name: "order", label: "Order", type: "number" },
    { name: "icon", label: "Icon", type: "image", required: true },
  ],
  investment_services: [
    { name: "title", label: "Title", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "benefits", label: "benefits", type: "list" },
    { name: "order", label: "Order", type: "number" },
    { name: "icon", label: "Icon", type: "image", required: true },
  ],
  financial_planning: [
    { name: "title", label: "Title", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "benefits", label: "benefits", type: "list" },
    { name: "order", label: "Order", type: "number" },
    { name: "icon", label: "Icon", type: "image", required: true },
  ],
};
