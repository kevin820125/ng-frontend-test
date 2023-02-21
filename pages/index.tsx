import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import Quest from '@/interfaces/Quest';
import { useQuests } from '@/hooks/useQuest';
import { darkTheme } from '@/styles/theme';

const Section = styled.section`
  @media (min-width: 1280px) {
    max-width: 1200px;
    margin: 0 auto;
    padding: 5rem 2rem;
  }
  @media (max-width: 768px) {
    padding: 3rem 0.5rem;
  }
  padding: 5rem 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 1.5rem;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
`;

const Card = styled.div`
  background: ${darkTheme.colors.lighterBlack};
  border: 1px solid rgba(58, 58, 58, 0.5);
  border-radius: 10px;
  padding: 0.4rem;
  height: 100%;
  display: grid;
  grid-template-rows: 1.5fr 1fr;
`;

const CardImageContainer = styled.div`
  background-size: cover;
`;

const CardBody = styled.div`
  padding: 0 0.5rem;
`;

const CardTitle = styled.h1`
  font-family: 'Cinzel', serif;
  font-weight: 700;
  font-size: 14px;
  text-transform: capitalize;
  color: ${darkTheme.colors.white};
`;

const CardLabelGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  margin-top: -5px;
`;

const CardLabels = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: ${props =>
    props.color === 'gold'
      ? darkTheme.colors.gold
      : props.color === 'blue'
      ? darkTheme.colors.blue
      : darkTheme.colors.white};
`;

const CardSwordFlex = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`;

const Quests = () => {
  const { isLoading, data, error } = useQuests();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Grid>
      {data?.map((quest: Quest) => (
        <Link key={quest.id} href={'/quests/' + quest.id}>
          <Card>
            <CardImageContainer style={{ backgroundImage: 'url(' + quest.cover + ')' }} />
            <CardBody>
              <CardTitle>{quest.title}</CardTitle>
              <CardLabelGrid>
                <CardLabelGrid style={{ marginRight: 12 }}>
                  <CardLabels color='gold'>Skill tree</CardLabels>
                  <CardLabels color='blue'>{quest.skillTree}</CardLabels>
                </CardLabelGrid>
                <CardLabelGrid style={{ marginLeft: 12 }}>
                  <CardLabels color='gold'>Difficulty</CardLabels>
                  <CardSwordFlex>
                    {[...Array(5)].map((_, i) => (
                      <img key={i} src={`/images/svgs/${i < quest.difficulty ? 'swordColor' : 'sword'}.svg`} alt='' />
                    ))}
                  </CardSwordFlex>
                </CardLabelGrid>
              </CardLabelGrid>
              <CardLabelGrid>
                <CardLabelGrid style={{ marginRight: 12 }}>
                  <CardLabels color='gold'>Skill</CardLabels>
                  <CardLabels>{quest.skill}</CardLabels>
                </CardLabelGrid>
                <CardLabelGrid style={{ marginLeft: 12 }}>
                  <CardLabels color='gold'>Experience</CardLabels>
                  <CardLabels>{quest.experience}</CardLabels>
                </CardLabelGrid>
              </CardLabelGrid>
              <CardLabelGrid>
                <CardLabelGrid style={{ marginRight: 12 }}>
                  <CardLabels color='gold'>Type</CardLabels>
                  <CardLabels>{quest.type}</CardLabels>
                </CardLabelGrid>
                <CardLabelGrid style={{ marginLeft: 12 }}>
                  <CardLabels color='gold'>Gold</CardLabels>
                  <CardLabels>{quest.gold}</CardLabels>
                </CardLabelGrid>
              </CardLabelGrid>
            </CardBody>
          </Card>
        </Link>
      ))}
    </Grid>
  );
};

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Node Guardians</title>
        <meta name='description' content='Node Guardians Homepage' />
      </Head>
      <main>
        <Link href='/'>
          <Image width={245} height={30} src='/logo.svg' alt='Node Guardians' style={{ margin: '10px 0 0 15px' }} />
        </Link>
        <Section>
          <Quests />
        </Section>
      </main>
    </>
  );
};

export default HomePage;
