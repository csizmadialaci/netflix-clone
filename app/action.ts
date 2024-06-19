"use server";
import { revalidatePath } from "next/cache";
import prisma from "./utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";

export async function addToWatchList(formData: FormData) {
  "use server";
  const movieId = formData.get("movieId");
  const pathName = formData.get("pathName") as string;
  const session = await getServerSession(authOptions);

  const data = await prisma.watchList.create({
    data: {
      userId: session?.user?.email as string,
      movieId: Number(movieId),
    },
  });

  revalidatePath(pathName);
}

export async function deleteFromWatchList(formData: FormData) {
  "use server";
  const watchListId = formData.get("watchListId") as string;
  const pathName = formData.get("pathName") as string;

  const data = await prisma.watchList.delete({
    where: {
      id: watchListId,
    },
  });
  revalidatePath(pathName);
}

export async function searchMovies(searchInput: string) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.email;

  const movies = await prisma.movie.findMany({
    where: {
      title: {
        contains: searchInput as string,
        mode: "insensitive",
      },
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
          userId: userId as string,
        },
      },
    },
  });
  return movies;
}

export async function getUserSession() {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name || "";
  const userEmail = session?.user?.email || "";
  return { userName, userEmail };
}
