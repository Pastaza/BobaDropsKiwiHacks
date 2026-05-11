import { Suspense } from "react";
import { ValidateClient } from "./validate-client";

export const metadata = {
  title: "Camera validation"
};

export default function ValidatePage() {
  return (
    <Suspense>
      <ValidateClient />
    </Suspense>
  );
}
