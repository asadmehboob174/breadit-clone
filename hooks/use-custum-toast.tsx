import Link from "next/link";
import { toast } from "./use-toast";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const useCustomToast = () => {
    const loginToast = () => {
        const { dismiss} = toast({
            title: "Login required.",
            description : "you need to be logged in to do that.",
            variant : "destructive",
            action : (
              <Link onClick={() => dismiss()} className={cn(buttonVariants({variant : "outline"}),"")} href={"/sign-in"}>Login</Link>
            )
        })
    }

    return {loginToast};
}