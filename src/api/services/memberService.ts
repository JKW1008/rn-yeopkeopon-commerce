import { supabase } from "../supabase";
import { getDeviceUserId } from "../../utils/userIdentifier";
import { Address, PaymentMethod } from "../types";

/**
 * 사용자 정보 관련 API 서비스 (주소, 결제수단 등)
 */
export const memberService = {
  async getAddresses(): Promise<Address[]> {
    const userId = await getDeviceUserId();
    let { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;

    if (data?.length === 0) {
      const demoAddress = {
        user_id: userId,
        first_name: "Iris",
        last_name: "Watson",
        street: "606-3727 Ullamcorper. St",
        city: "Roseville",
        state: "NH",
        zip_code: "11523",
        phone: "(786) 713-8616",
        is_default: true
      };
      const { data: seeded, error: seedError } = await supabase
        .from("addresses")
        .insert(demoAddress)
        .select();
      
      if (!seedError && seeded) data = seeded;
    }

    return data.map((a: any) => ({
      id: a.id,
      firstName: a.first_name,
      lastName: a.last_name,
      street: a.street,
      city: a.city,
      state: a.state,
      zipCode: a.zip_code,
      phone: a.phone,
      isDefault: a.is_default
    }));
  },

  async createAddress(address: Omit<Address, "id">): Promise<Address> {
    const userId = await getDeviceUserId();
    const { data, error } = await supabase
      .from("addresses")
      .insert({
        user_id: userId,
        first_name: address.firstName,
        last_name: address.lastName,
        street: address.street,
        city: address.city,
        state: address.state,
        zip_code: address.zipCode,
        phone: address.phone,
        is_default: address.isDefault
      })
      .select()
      .single();

    if (error) throw error;
    return {
      ...address,
      id: data.id
    };
  },

  async updateAddress(address: Address): Promise<void> {
    const { error } = await supabase
      .from("addresses")
      .update({
        first_name: address.firstName,
        last_name: address.lastName,
        street: address.street,
        city: address.city,
        state: address.state,
        zip_code: address.zipCode,
        phone: address.phone,
        is_default: address.isDefault
      })
      .eq("id", address.id);

    if (error) throw error;
  },

  async getPaymentMethods(): Promise<PaymentMethod[]> {
    const userId = await getDeviceUserId();
    let { data, error } = await supabase
      .from("payment_methods")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;

    if (data?.length === 0) {
      const demoCard = {
        user_id: userId,
        brand: "Mastercard",
        last_four: "1234",
        expiry_date: "12/26"
      };
      const { data: seeded, error: seedError } = await supabase
        .from("payment_methods")
        .insert(demoCard)
        .select();
      
      if (!seedError && seeded) data = seeded;
    }

    return data.map((p: any) => ({
      id: p.id,
      brand: p.brand,
      lastFour: p.lastFour || p.last_four, // 안정성을 위해 둘 다 대응
      expiryDate: p.expiryDate || p.expiry_date
    }));
  },

  async createPaymentMethod(pm: Omit<PaymentMethod, "id">): Promise<PaymentMethod> {
    const userId = await getDeviceUserId();
    const { data, error } = await supabase
      .from("payment_methods")
      .insert({
        user_id: userId,
        brand: pm.brand,
        last_four: pm.lastFour,
        expiry_date: pm.expiryDate
      })
      .select()
      .single();

    if (error) throw error;
    return {
      ...pm,
      id: data.id
    };
  },

  async updatePaymentMethod(pm: PaymentMethod): Promise<void> {
    const { error } = await supabase
      .from("payment_methods")
      .update({
        brand: pm.brand,
        last_four: pm.lastFour,
        expiry_date: pm.expiryDate
      })
      .eq("id", pm.id);

    if (error) throw error;
  }
};
