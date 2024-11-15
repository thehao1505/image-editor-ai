import { useSubscriptionModel } from "@/features/subscriptions/store/use-subscription-model";

export const usePaywall = () => {
  const subscriptionModel = useSubscriptionModel();

  const shouldBlock = true;

  return {
    isLoading: false,
    shouldBlock,
    triggerPaywall: () => {
      subscriptionModel.onOpen();
    }
  }
};