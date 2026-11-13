export const POLICY_VERSION = "2026-11-13";

export const POLICY_UPDATED = "November 13, 2026";

export type PolicyId = "terms" | "privacy" | "delivery" | "cancellation";

export type PolicySection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  after?: string[];
};

export type Policy = {
  id: PolicyId;
  label: string;
  title: string;
  intro: string[];
  sections: PolicySection[];
  closing: string[];
};

export const POLICIES: Policy[] = [
  {
    id: "terms",
    label: "Terms & Conditions",
    title: "Terms & Conditions",
    intro: [
      "Welcome to Lyn's Banana Bread! By placing an order with us, you agree to the following terms and conditions.",
    ],
    sections: [
      {
        heading: "1. Orders",
        bullets: [
          "All orders must be placed through our official Facebook page.",
          "Please provide accurate order details, including your name, contact information, selected flavor, quantity, and preferred delivery or pickup schedule.",
          "Orders are subject to availability.",
          "Your order is considered confirmed once the details and payment arrangements have been agreed upon.",
        ],
      },
      {
        heading: "2. Product Information",
        bullets: [
          "All our banana breads are homemade and freshly baked.",
          "Since each batch is handmade, slight differences in appearance, size, and texture may occur.",
          "Product photos are for reference and may not look exactly the same as the actual product.",
        ],
      },
      {
        heading: "3. Payment",
        bullets: [
          "Payment arrangements must be confirmed before your order is prepared.",
          "Please send proof of payment when requested.",
          "Delivery fees are separate from the product price.",
        ],
      },
      {
        heading: "4. Delivery and Pick-up",
        bullets: [
          "We currently accommodate deliveries within Metro Manila.",
          "Customers may book Lalamove or their preferred delivery service.",
          "Delivery fees are shouldered by the customer.",
          "Pickup schedules must be confirmed with us in advance.",
        ],
      },
      {
        heading: "5. Cancellations and Refunds",
        bullets: [
          "Please review your order carefully before confirming.",
          "Changes and cancellations must be communicated as early as possible.",
          "Confirmed orders may no longer be changed or cancelled once preparation has started.",
          "Refunds or replacements for incorrect or damaged orders will be handled according to our Refund & Replacement Policy.",
        ],
      },
      {
        heading: "6. Agreement",
        paragraphs: [
          "By placing an order, you acknowledge that you have read and agreed to these Terms & Conditions.",
        ],
      },
    ],
    closing: ["Thank you for supporting our homemade banana bread business!"],
  },
  {
    id: "privacy",
    label: "Privacy Policy",
    title: "Privacy Policy",
    intro: [
      "At Lyn's Banana Bread, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect your information when you place an order with us.",
    ],
    sections: [
      {
        heading: "1. Information We Collect",
        paragraphs: ["When you place an order, we may collect the following information:"],
        bullets: [
          "Full name",
          "Contact number",
          "Delivery address",
          "Order details and preferences",
          "Payment confirmation or transaction details, when applicable",
        ],
      },
      {
        heading: "2. How We Use Your Information",
        paragraphs: [
          "We collect your information only for legitimate business purposes, including:",
        ],
        bullets: [
          "Processing and confirming your orders.",
          "Communicating with you about your purchase.",
          "Arranging delivery or pickup.",
          "Confirming payments.",
          "Responding to questions and concerns.",
        ],
      },
      {
        heading: "3. Sharing of Information",
        paragraphs: [
          "We do not sell or rent your personal information to other parties.",
          "Your information may be shared with a delivery service, such as Lalamove, only when necessary to complete your delivery.",
        ],
      },
      {
        heading: "4. Data Protection",
        paragraphs: [
          "We take reasonable steps to protect your personal information against unauthorized access, use, disclosure, or loss.",
          "We only keep your information for as long as necessary to fulfill the purposes stated in this policy or as required by applicable laws.",
        ],
      },
      {
        heading: "5. Your Privacy Rights",
        paragraphs: [
          "Under the Philippine Data Privacy Act of 2012 (Republic Act No. 10173), you have rights regarding your personal information, including the right to access, correct, or request the deletion of your information, subject to applicable legal requirements.",
          "You may contact us through our official Facebook page for privacy-related questions or requests.",
        ],
      },
      {
        heading: "6. Changes to This Policy",
        paragraphs: [
          "We may update this Privacy Policy when necessary. Any changes will be posted on this website.",
          "By providing your personal information when placing an order, you acknowledge this Privacy Policy.",
        ],
      },
    ],
    closing: ["Thank you for trusting Lyn's Banana Bread with your information."],
  },
  {
    id: "delivery",
    label: "Delivery Policy",
    title: "Delivery Policy",
    intro: [
      "We want every order from Lyn's Banana Bread to reach you safely and in good condition. Please read our delivery guidelines before placing an order.",
    ],
    sections: [
      {
        heading: "1. Delivery Coverage",
        bullets: [
          "We currently accommodate deliveries within Metro Manila.",
          "Delivery availability depends on the customer's location and the availability of delivery services.",
        ],
      },
      {
        heading: "2. Delivery Arrangements",
        bullets: [
          "Customers may book Lalamove or their preferred delivery service.",
          "Customers are responsible for booking and paying the delivery fee.",
          "Delivery details and pickup schedules must be confirmed with us before booking.",
        ],
      },
      {
        heading: "3. Delivery Fees",
        bullets: [
          "Delivery fees are not included in the product prices.",
          "The customer will shoulder the delivery fee.",
          "Fees may vary depending on the delivery location, service, and booking conditions.",
        ],
      },
      {
        heading: "4. Pickup Schedule",
        bullets: [
          "Please coordinate your preferred pickup schedule with us in advance.",
          "Orders must be picked up at the agreed date and time.",
          "Kindly inform us if there are any changes to your pickup schedule.",
        ],
      },
      {
        heading: "5. Delivery Delays",
        bullets: [
          "Delivery times may vary depending on traffic, weather, and courier availability.",
          "Once the order has been handed over to the courier, delivery is handled by the chosen service provider.",
          "We will do our best to coordinate with the customer if any delivery concerns arise.",
        ],
      },
      {
        heading: "6. Upon Receiving Your Order",
        paragraphs: [
          "Please check your order upon arrival. If you receive an incorrect or damaged product, contact us as soon as possible and refer to our Refund & Replacement Policy.",
        ],
      },
    ],
    closing: ["Thank you for choosing Lyn's Banana Bread!"],
  },
  {
    id: "cancellation",
    label: "Cancellation & Refunds",
    title: "Cancellation, Refund & Replacement Policy",
    intro: [
      "At Lyn's Banana Bread, we prepare each order with care. To help us manage our orders properly, please review our cancellation, refund, and replacement guidelines.",
    ],
    sections: [
      {
        heading: "1. Order Cancellation",
        bullets: [
          "Customers may request to cancel an order before preparation begins.",
          "Once preparation has started, cancellations may no longer be accepted.",
          "Please contact us as early as possible if you need to cancel or change your order.",
        ],
      },
      {
        heading: "2. Refunds",
        paragraphs: ["Refunds may be considered in the following situations:"],
        bullets: [
          "You received the wrong product or flavor.",
          "Your order was incomplete due to an error on our part.",
          "Your product arrived damaged or in an unacceptable condition, and the issue is verified.",
        ],
        after: [
          "Approved refunds will be discussed and arranged with the customer.",
        ],
      },
      {
        heading: "3. Replacements",
        paragraphs: ["We may offer a replacement if:"],
        bullets: [
          "The wrong flavor or product was provided.",
          "The product has a verified quality issue.",
          "The order was damaged before it was handed over to the customer or courier.",
        ],
        after: ["Replacement arrangements will be discussed with the customer."],
      },
      {
        heading: "4. Reporting an Issue",
        paragraphs: ["If you experience a problem with your order:"],
        bullets: [
          "Contact us within 24 hours of receiving your order.",
          "Provide your order details and a description of the issue.",
          "Send clear photos or videos as supporting evidence, when applicable.",
        ],
        after: ["This helps us review and resolve your concern properly."],
      },
      {
        heading: "5. Non-Refundable Situations",
        paragraphs: ["Refunds or replacements may not be provided for:"],
        bullets: [
          "Changes of mind after an order has been prepared.",
          "Personal taste preferences.",
          "Damage caused by improper handling or storage after the order has been received.",
          "Incorrect delivery information provided by the customer.",
        ],
        after: [
          "All concerns will be reviewed fairly and in accordance with applicable consumer protection laws.",
        ],
      },
      {
        heading: "6. Contact Us",
        paragraphs: [
          "For cancellation requests, refund inquiries, or replacement concerns, please message us through our official Facebook page.",
        ],
      },
    ],
    closing: ["We appreciate your understanding and continued support!"],
  },
];

export function getPolicy(id: PolicyId): Policy {
  return POLICIES.find((policy) => policy.id === id) ?? POLICIES[0];
}
