function PostCreation({ className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      id="post-button"
      className={`text-[#ffffff66] text-sm select-none font-roboto text-nowrap gap-8 p-0 pl-6 pr-4 items-center flex bg-gradient-to-b from-transparent to-[#1F1F1F] backdrop-blur-md rounded-2xl ring-2 ring-[#ff6600] cursor-pointer ${className}`}
    >
      Type something in here...
      <svg
        className="w-4 h-4 aspect-square"
        viewBox="0 0 20 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.5903 0.181614C18.9673 0.408476 19.1651 0.800623 19.0942 1.19277L16.7056 14.6749C16.6496 14.9892 16.4294 15.2647 16.1084 15.4203C15.7875 15.5758 15.403 15.5953 15.0634 15.4721L10.5997 13.8614L8.04321 16.2629C7.71105 16.5773 7.18854 16.681 6.72949 16.5254C6.27043 16.3698 5.97186 15.9842 5.97186 15.5564V12.847C5.97186 12.7174 6.02784 12.5942 6.12861 12.497L12.3837 6.57264C12.6002 6.36847 12.5927 6.0541 12.3688 5.85965C12.1449 5.66519 11.7828 5.65223 11.5477 5.83696L3.95649 11.6932L0.660982 10.2608C0.265373 10.089 0.0115852 9.74547 0.000388726 9.36304C-0.0108078 8.98062 0.220587 8.62412 0.601268 8.43291L17.3214 0.136241C17.7207 -0.0614529 18.2134 -0.0420076 18.5903 0.181614Z"
          fill="#FF6600"
        />
      </svg>
    </div>
  );
}

export default PostCreation;
