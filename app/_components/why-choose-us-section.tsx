import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import userFriendlyImg from "@/assets/user-friendly.png";
import supportImg from "@/assets/support.png";
import secureImg from "@/assets/secure.svg";

function WhyChooseSection() {
  return (
    <div className="w-full flex items-center py-12">
      <div className="container space-y-6">
        <h2 className="text-center">Why Choose Penny Pilot?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
              <div className="size-60 relative rounded-full shadow-md">
                <Image
                  src={userFriendlyImg}
                  alt={"user friendly"}
                  objectFit="contain"
                  className="rounded-full"
                  fill
                  priority
                />
              </div>
              <h3>User-Friendly</h3>
              <p>
                No complicated setups. Just simple, straightforward tracking.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
              <div className="size-60 relative rounded-full shadow-md">
                <Image
                  src={secureImg}
                  alt={"secure"}
                  objectFit="contain"
                  className="rounded-full"
                  fill
                  priority
                />
              </div>
              <h3>Secure</h3>
              <p>
                Your data is protected with advanced encryption and secure cloud
                storage.
              </p>
            </CardContent>
          </Card>
          <Card className="md:col-span-2 lg:col-span-1">
            <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
              <div className="size-60 relative rounded-full shadow-md">
                <Image
                  src={supportImg}
                  alt={"support"}
                  objectFit="contain"
                  className="rounded-full"
                  fill
                  priority
                />
              </div>
              <h3>Reliable Support</h3>
              <p>
                Our dedicated support team is always ready to help you with any
                questions or issues.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseSection;
