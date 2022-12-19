import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
}

const HeadComponent = ({ title, description }: Props) => {
  return (
    <Head>
      {title && <title> {title} </title>}
      {description && <meta name="description" content={description} />}
    </Head>
  );
};
export default HeadComponent;
