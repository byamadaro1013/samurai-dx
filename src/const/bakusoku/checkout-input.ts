import { z } from "zod";

export const checkoutInputSchema = z
  .object({
    officeName: z
      .string()
      .transform((value) => value.trim().normalize("NFC"))
      .pipe(
        z
          .string()
          .min(1, "事務所名を入力してください。")
          .max(200, "事務所名は200文字以内で入力してください。")
      )
      .refine(
        (value) => !/[\u0000-\u001f\u007f]/.test(value),
        "事務所名に使用できない文字が含まれています。"
      ),
    email: z
      .string()
      .trim()
      .max(254, "メールアドレスが長すぎます。")
      .email("有効なメールアドレスを入力してください。")
      .transform((value) => {
        const at = value.lastIndexOf("@");
        return value.slice(0, at) + "@" + value.slice(at + 1).toLowerCase();
      }),
    acceptedTerms: z
      .boolean()
      .refine((value) => value === true, "利用規約への同意が必要です。"),
  })
  .strict();

export type CheckoutInput = z.infer<typeof checkoutInputSchema>;

export type CheckoutResponse =
  | { checkoutUrl: string; orderId: string }
  | { error: { code: string; message: string } };
