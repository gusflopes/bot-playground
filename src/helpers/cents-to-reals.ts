export async function centsToReals(amountInCents: string) {
  // const valor = "150012";
  const reals = amountInCents.substring(0, amountInCents.length - 2);
  const cents = amountInCents.substring(amountInCents.length - 2, amountInCents.length);
  console.log(`${reals},${cents}`);
  return `${reals},${cents}`;
}