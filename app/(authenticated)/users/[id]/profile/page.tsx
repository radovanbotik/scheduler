import DescriptionList from "@/components/profile/DescriptionList";
import Heading from "@/components/profile/Heading";

export default function Page() {
  return (
    <div className="//lg:mt-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-0">
        {/* <h2 className="text-balance font-semibold tracking-tight text-gray-900 sm:text-2xl">
          User profile
        </h2> */}
        <Heading />
        <DescriptionList />
      </div>
    </div>
  );
}
