import { Clock, ShoppingBag, Star, Truck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const HomeFeature = () => {
  const featuresWhyChooseUs = [
    {
      description:
        "Free shipping on all orders over $50. Fast and reliable delivery to your doorstep.",
      icon: <Truck className="text-primary h-6 w-6" />,
      title: "Free Shipping",
    },
    {
      description:
        "Your payment information is always safe and secure with us. We use industry-leading encryption.",
      icon: <ShoppingBag className="text-primary h-6 w-6" />,
      title: "Secure Checkout",
    },
    {
      description:
        "Our customer support team is always available to help with any questions or concerns.",
      icon: <Clock className="text-primary h-6 w-6" />,
      title: "24/7 Support",
    },
    {
      description:
        "We stand behind the quality of every product we sell. 30-day money-back guarantee.",
      icon: <Star className="text-primary h-6 w-6" />,
      title: "Quality Guarantee",
    },
  ];

  return (
    <section className={`py-12 md:py-16`} id="features">
      <div className={`container mx-auto max-w-7xl`}>
        <div className="mb-8 flex flex-col items-center text-center">
          <h2
            className={`font-display text-3xl leading-tight font-bold tracking-tight md:text-4xl`}
          >
            Why Choose Us
          </h2>
          <div className="bg-primary mt-2 h-1 w-12 rounded-full" />
          <p
            className={`text-muted-foreground mt-4 max-w-2xl text-center md:text-lg`}
          >
            We offer the best shopping experience with premium features
          </p>
        </div>
        <div className={`grid gap-8 md:grid-cols-2 lg:grid-cols-4`}>
          {featuresWhyChooseUs.map((feature) => (
            <Card
              className={`bg-background rounded-2xl border-none shadow transition-all duration-300 hover:shadow-lg`}
              key={feature.title}
            >
              <CardHeader className="pb-2">
                <div
                  className={`bg-primary/10 mb-3 flex h-12 w-12 items-center justify-center rounded-full`}
                >
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
