import Image from "next/image";

const ProfileCard = () => {
  return (
    <div className="w-[300px] max-[450px]:w-[250px] bg-gray-200 rounded-xl snap-start">
      <div className="p-4 flex flex-col items-center gap-2">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4">
          <Image
            src="/assets/images/default-profile.webp"
            alt="Profile picture"
            fill
            sizes="100%"
          />
        </div>
        <h2 className="text-xl text-gray-800 font-semibold">Seeker</h2>
        <p className="text-sm text-gray-500">Full Stack (BE-Heavy) Engineer</p>
        <div className="space-x-2">
          <span className="px-2.5 py-1 bg-gray-600 text-white rounded-full text-xs">
            NodeJS
          </span>
          <span className="px-2.5 py-1 bg-gray-600 text-white rounded-full text-xs">
            AngularJS
          </span>
          <span className="px-2.5 py-1 bg-gray-600 text-white rounded-full text-xs">
            HTML/CSS
          </span>
        </div>
        <hr className="border-[1px] border-gray-400 w-full mt-2" />
        <p className="mt-2 text-sm text-center px-4">
          Seeker is a full stack developer with 12 years of experience in
          software development. Having held tech-leadership roles in
          fast-growing startups.
        </p>
        <button className="my-2 px-4 py-2 bg-gray-700 text-sm text-white rounded-full">
          View Resume
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
