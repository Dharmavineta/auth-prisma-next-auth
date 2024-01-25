"use client";
import { newVerification } from "@/actions";
import CardWrapper from "@/components/common/card-wrapper";
import FormError from "@/components/common/form-error";
import FormSuccess from "@/components/common/form-success";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const NewVerification = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("No token");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      })
      .catch((error) => setError("Something went wrong"));
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex items-center justify-center h-screen">
      <CardWrapper
        headerLabel="Confirming your verification"
        backButtonLabel="Back to login"
        backButtonhref="/login"
      >
        <div className="flex items-center flex-col gap-y-5 w-full justify-center">
          {!success && !error && <BeatLoader />}
          <FormSuccess message={success} />
          <FormError message={error} />
        </div>
      </CardWrapper>
    </div>
  );
};

export default NewVerification;
