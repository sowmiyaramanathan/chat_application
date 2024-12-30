import Head from "next/head";
import { Inter } from "next/font/google";
import Home from "../../components/Home";

const inter = Inter({ subsets: ["latin"] });

export default function home() {
  return (
    <>
      <Head>
        <title>Mini Chat App</title>
        <meta name="keywords" content="chat message connect" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </>
  );
}
