import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatExpiryDate(value: string): string {
  const digits = value.replace(/\D/g, "");

  // Jika tidak ada digit, kembalikan string kosong
  if (digits.length === 0) {
    return "";
  }

  // Jika panjang digit 1 atau 2, kembalikan langsung
  if (digits.length < 3) {
    return digits; // Hanya mengembalikan MM
  }

  // Format sebagai MM/YY jika lebih dari 2 digit
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
}

export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  return digits.slice(0, 16);
}

export function formatName(name: string): string {
  // Regex: mencari "-" yang tidak diawali oleh huruf "t" atau "T"
  // (?<![tT]) adalah lookbehind negatif
  return name.replace(/(?<![tT])-/g, " ");
}
