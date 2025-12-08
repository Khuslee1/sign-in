export default function ProfileForm() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-300 ">
      <div className="w-[480px]  bg-white rounded-xl p-8 flex flex-col gap-7 ">
        <div className="flex flex-col gap-2">
          <img src="logo.png" width="60" height="60" />
          <h1 className="text-[26px] font-semibold">You're All Set 🔥</h1>
          <p className="text-[18px] text-[#8E8E8E]">
            We have received your submission. Thank you!
          </p>
        </div>
      </div>
    </div>
  );
}
