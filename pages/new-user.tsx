import { NewUserForm } from '../src/components/newUserPage/NewUserForm';
import { PageContainer } from '../src/components/shared';
import { type NewUserInfo } from '../src/components/newUserPage/types';

type NewUserPageProps = { query: NewUserInfo };

export default function NewUserPage({ query }: NewUserPageProps) {
  return (
    <PageContainer bgColor="background.paper">
      <NewUserForm query={query} />
    </PageContainer>
  );
}

export async function getServerSideProps({ query }: { query: NewUserInfo }) {
  return { props: { query } };
}
