"use client";

import useRegisterModal from "@/hooks/useRegisterModal";
import type { RegisterForm } from "@/types/RegisterForm";
import { registerSchema } from "@/types/RegisterForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Heading from "@/components/Heading";
import Input from "@/components/inputs/Input";
import Modal from "@/components/modals/Modal";

import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import Button from "../Button";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema), // 他のvalidationライブラリを使う時に使用
    });
    const onSubsmit: SubmitHandler<RegisterForm> = useCallback(
        async (data) => {
            setIsLoading(true);
            try {
                const response = await fetch("/api/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
                registerModal.onClose();
            } catch (err) {
                toast.error("Something went Wrong.");
            } finally {
                setIsLoading(false);
            }
        },
        [registerModal]
    );

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="" subtitle="" />
            <Input
                id="email"
                label="Email"
                type="email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Name"
                type="text"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );
    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => {}}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => {}}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row justify-center items-center gap-2">
                    <div>Already have an account</div>
                    <button
                        className="text-neutral-800 cursor-pointer hover:underline"
                        onClick={registerModal.onClose}
                    >
                        Log in
                    </button>
                </div>
            </div>
        </div>
    );
    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubsmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};
export default RegisterModal;
