import { authOptions } from "@/app/utils/auth";
import prisma from "@/app/utils/db";
import { getServerSession } from "next-auth";

async function getData(category: string, userId: string) {
  switch (category) {
    case "shows": {
      const data = await prisma.movie.findMany({
        where: {
          category: "show",
        },
        select: {
          age: true,
          duration: true,
          id: true,
          title: true,
          release: true,
          imageString: true,
          overview: true,
          youtubeString: true,
          WatchLists: {
            where: {
              userId: userId,
            },
          },
        },
      });
      return data;
    }
    default: {
      throw new Error("switch case default case error");
    }
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { genre: string };
}) {
  const session = await getServerSession(authOptions);

  const data = await getData(params.genre, "abc");

  return (
    <div>
      {data.map((movie) => (
        <h1 key={movie.id}>{movie.title}</h1>
      ))}
    </div>
  );
}
