import Container from "../common/Container";

const Footer = () => {
  return (
    <footer className="bg-[#4A294B] text-white mt-20">
      <Container>
        <div className="py-12 flex flex-col items-center text-center gap-4">

          <h2 className="text-2xl">
            ELIL Jewellery
          </h2>

          <p className="font-manrope text-sm text-gray-300">
            Timeless elegance crafted for every story.
          </p>

          <p className="text-xs text-gray-400 mt-4">
            © {new Date().getFullYear()} ELIL Jewellery.
            All Rights Reserved.
          </p>

        </div>
      </Container>
    </footer>
  );
};

export default Footer;