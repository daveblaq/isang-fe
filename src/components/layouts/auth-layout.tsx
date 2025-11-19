import React, {
  Fragment,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

interface AuthLayoutProps extends PropsWithChildren {
  title: string;
  description?: string;
  canonical?: string;
  image?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

const heroImages = [
  "https://ik.imagekit.io/shiga/isang/5a8cc492899a79a1242bf20406e73283de84c3ca.jpg?updatedAt=1763205486047",
  "https://ik.imagekit.io/shiga/isang/76784ab6fab6852550e030bf927186c4212d8657.jpg?updatedAt=1763205491106",
];

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const slides = useMemo(() => heroImages, []);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <Fragment>
      <main className="h-dvh  w-full bg-white">
        <div className="lg:w-full w-11/12 h-full mx-auto ">
          <div className="flex overflow-hidden lg:flex-row flex-col w-full lg:gap-[50px] gap-0">
            <div className="lg:w-1/2 w-full overflow-auto h-auto px-0 pt-4 md:pt-6 lg:pt-[2rem] pb-4 md:pb-6">
              <div className="w-full h-full overflow-y-scroll custom-scrollbar div-scroll scrollbar-hidden ">
                <div className="mx-auto w-full">{children}</div>
              </div>
            </div>
            <div className="relative h-screen lg:w-1/2 w-full md:block hidden bg-white overflow-hidden">
              <div className="w-full h-full object-cover relative p-8">
                <div className="relative h-full w-full">
                  <div className="absolute -top-18 -left-18 h-80 w-64 rounded-br-[16px] bg-white" />
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      backgroundImage: `url('${slides[imageIndex]}')`,
                      backgroundPosition: "top",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="h-full w-full rounded-[16px] bg-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default AuthLayout;
