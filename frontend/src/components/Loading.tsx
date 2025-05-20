import Skeleton from '@mui/material/Skeleton';

export default function Loading() {
  return (
    <div className="customContainer h-screen flex justify-center items-center">
      <Skeleton variant="rectangular" width={300} height={100} />
    </div>
  );
}
