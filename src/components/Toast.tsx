import { Check, X } from "lucide-react";

type ToastProps = {
    message: string;
    type?: "success" | "error";
};

export default function Toast({
    message,
    type = "success",
}: ToastProps) {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-[#26262B] bg-[#141416] px-4 py-3 text-sm text-white shadow-xl">
            {type === "success" ? (
                <Check size={16} className="text-green-400" />
            ) : (
                <X size={16} className="text-red-400" />
            )}

            <span>{message}</span>
        </div>
    );
}