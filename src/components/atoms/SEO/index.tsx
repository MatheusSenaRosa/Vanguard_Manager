import Head from "next/head";

type Props = {
  title: string;
};

export const SEO = ({ title }: Props) => {
  return (
    <Head>
      <title>{title ? `${title} | Vanguard` : "Vanguard"}</title>
    </Head>
  );
};
