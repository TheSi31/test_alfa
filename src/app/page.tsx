import Image from "next/image";

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl font-bold">Привет</h1>
      <p className="text-2xl">Про эту страницу ничего не было сказано поэтому</p>
      <Image src={"https://i.gifer.com/4SHX.gif"} width={100} height={100} alt="Мега крутой котенок"></Image>
    </main>
  );
}
