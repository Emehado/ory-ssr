const Header = ({ title }: { title: string }) => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        alt="Tailwind CSS company logo"
        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
        className="mx-auto h-10 w-auto"
      />
      <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        {title}
      </h2>
    </div>
  );
};

export default Header;
