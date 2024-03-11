import Head from "next/head";
import Layout from "@/components/Layout";
import SpellCard from "@/components/SpellCard";
import apiService from "@/services/apiService";

const SpellDetailPage = ({ spell }) => {
  return (
    <Layout>
      <Head>
        <title>mageHand - {spell.name}</title>
      </Head>
      <SpellCard spell={spell} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const spell = await apiService.getSpell(slug);

  return {
    props: {
      spell,
    },
  };
}

export default SpellDetailPage;
