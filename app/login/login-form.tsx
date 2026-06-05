"use client";

import { SignIn } from "@clerk/nextjs";
import styles from "../login.module.css";

export function LoginForm() {
  return (
    <div className={styles.clerkWrap}>
      <SignIn
        routing="path"
        path="/login"
        signUpUrl="/signup"
        fallbackRedirectUrl="/dashboard"
        appearance={{
          variables: {
            colorBackground: "#09090b",
            colorInputBackground: "#18181b",
            colorInputText: "#f4f4f5",
            colorText: "#f4f4f5",
            colorTextSecondary: "#a1a1aa",
            colorPrimary: "#10b981",
            colorDanger: "#f87171",
            borderRadius: "0.5rem",
          },
          elements: {
            card: styles.clerkCard,
            headerTitle: styles.clerkHeaderTitle,
            headerSubtitle: styles.clerkHeaderSubtitle,
            socialButtonsBlockButton: styles.clerkSocialBtn,
            formButtonPrimary: styles.clerkPrimaryBtn,
            formFieldInput: styles.clerkInput,
            footerActionLink: styles.clerkFooterLink,
            identityPreviewEditButton: styles.clerkFooterLink,
            formFieldLabel: styles.clerkLabel,
            dividerLine: styles.clerkDivider,
            dividerText: styles.clerkDividerText,
          },
        }}
      />
    </div>
  );
}
