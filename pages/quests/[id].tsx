import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import axios from 'axios';
import Quest from '@/interfaces/Quest';
import { darkTheme } from '@/styles/theme';

const Section = styled.section`
  padding: 5rem 1.5rem;
  display: flex;
  justify-content: center;
  @media (min-width: 1280px) {
    max-width: 1200px;
    margin: 0 auto;
    padding: 5rem 2rem;
  }
  @media (max-width: 768px) {
    padding: 3rem 0.5rem;
  }
`;

const Card = styled.div`
  position: relative;
  width: 755px;
  background: ${darkTheme.colors.lighterBlack};
  border: 1px solid rgba(58, 58, 58, 0.5);
  border-radius: 10px;
  padding: 0.2rem;
`;

const CardBody = styled.div`
  padding: 0 0.5rem;
`;

const CardTitleFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const CardTitle = styled.h1`
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  color: ${darkTheme.colors.white};
  text-transform: uppercase;
  font-family: 'Cinzel', serif;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ImageWidth = styled.h1`
  @media (max-width: 500px) {
    display: none;
  }
`;

const CardLabelGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  margin-top: -5px;
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    gap: 0px;
  }
`;

const CardLabelDivGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 5px;
  margin-top: -5px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 2fr;
  }
`;

const CardLabels = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
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

const CardPara = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: ${darkTheme.colors.grey};
`;

const CardFooter = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  margin-top: 5rem;
  margin-bottom: 1rem;
`;

const FooterText = styled.h1`
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  text-transform: capitalize;
  color: ${darkTheme.colors.white};
  font-family: 'Cinzel', serif;
`;

const ExpBox = styled.div`
  width: 65px;
  height: 64.63px;
  border: 1px solid #bea77e;
  font-family: 'Cinzel', serif;
  background: linear-gradient(180deg, rgba(7, 15, 29, 0) 0%, rgba(54, 77, 137, 0.4) 100%);
`;

const ExpContent = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const ExpNumber = styled.p`
  font-weight: 700;
  font-size: 9px;
  line-height: 11px;
  text-align: right;
  color: #ffffff;
`;

const Button = styled.button`
  background: ${darkTheme.colors.lighterBlack};
  border-radius: 2.5px;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  color: ${darkTheme.colors.white};
  padding: 0.6rem 1.5rem;
  border: 1px solid ${darkTheme.colors.gold};
  cursor: pointer;
  margin-bottom: 0.5rem;
  font-family: 'Cinzel', serif;
`;

const CrossIcon = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;

interface QuestPageProps {
  questProp: Quest | null | undefined;
}

const QuestPage = ({ questProp }: QuestPageProps) => {
  return (
    <main>
      <Link href='/'>
        <Image width={245} height={30} src='/logo.svg' alt='Node Guardians' style={{ margin: '10px 0 0 15px' }} />
      </Link>
      <Section>
        <Card>
          <Link href='/'>
            <CrossIcon>
              <img src='/images/svgs/cross.svg' alt='' />
            </CrossIcon>
          </Link>
          <img src={questProp?.cover} alt='' style={{ width: '100%' }} />
          <CardBody>
            <CardTitleFlex>
              <ImageWidth>
                <img src='/images/svgs/linel.svg' alt='' />
              </ImageWidth>
              <CardTitle>{questProp?.title}</CardTitle>
              <ImageWidth>
                <img src='/images/svgs/liner.svg' alt='' />
              </ImageWidth>
            </CardTitleFlex>
            <CardLabelGrid>
              <CardLabelDivGrid>
                <CardLabels color='gold'>Skill tree</CardLabels>
                <CardLabels>{questProp?.skillTree} </CardLabels>
              </CardLabelDivGrid>
              <CardLabelDivGrid>
                <CardLabels color='gold'>Difficulty</CardLabels>
                <CardSwordFlex>
                  {[...Array(5)].map((_, i) => (
                    <Image
                      key={i}
                      src={`/images/svgs/${i < (questProp?.difficulty ?? 0) ? 'swordColor' : 'sword'}.svg`}
                      height={12.11}
                      width={12.11}
                      alt=''
                    />
                  ))}
                </CardSwordFlex>
              </CardLabelDivGrid>
            </CardLabelGrid>
            <CardLabelGrid>
              <CardLabelDivGrid>
                <CardLabels color='gold'>Skill</CardLabels>
                <CardLabels>{questProp?.skill}</CardLabels>
              </CardLabelDivGrid>
              <CardLabelDivGrid>
                <CardLabels color='gold'>Quest type</CardLabels>
                <CardLabels>{questProp?.type}</CardLabels>
              </CardLabelDivGrid>
            </CardLabelGrid>
            <CardPara>{questProp?.description}</CardPara>
            <CardFooter>
              <div>
                <FooterText>QUEST REWARDS</FooterText>
                <ExpBox>
                  <ExpContent>
                    <div>
                      <img src='/images/svgs/exp.svg' alt='' />
                      <ExpNumber>+ {questProp?.experience ?? 0}</ExpNumber>
                    </div>
                  </ExpContent>
                </ExpBox>
              </div>
              <Link href='/'>
                <Button>Go back</Button>
              </Link>
            </CardFooter>
          </CardBody>
        </Card>
      </Section>
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get('https://ng-frontend-test.vercel.app/api/quests');
  const quests: Quest[] = response.data;

  const paths = quests.map(quest => ({
    params: { id: quest.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<QuestPageProps> = async ({ params }) => {
  const id = params?.id;
  if (!id) {
    return {
      notFound: true,
    };
  }

  const response = await axios.get(`https://ng-frontend-test.vercel.app/api/quests/${id}`);
  const questProp: Quest = response.data;

  return { props: { questProp } };
};

export default QuestPage;
