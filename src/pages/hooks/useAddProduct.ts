import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/Auth/useAuth";
import { supabase } from "/supabaseClient";

export const useAddProduct = () => {
  const { user } = useAuth();

  const addProduct = async ({
    description,
    price,
    image_url,
  }: {
    description: string;
    price: number;
    image_url?: string;
  }) => {
    if (!description.trim()) return;

    const { error } = await supabase.from("products").insert([
      {
        description,
        price,
        image_url,
        user_id: user?.id,
      },
    ]);

    if (error) throw error;
  };

  return useMutation({ mutationFn: addProduct });
};
