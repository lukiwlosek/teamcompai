import { trpc } from '../utils/trpc';
 
export default function SayHi() {
  const userQuery = trpc.sayHi.useQuery();
 
  return (
    <div>
      <p>{userQuery.data}</p>
 
      
    </div>
  );
}