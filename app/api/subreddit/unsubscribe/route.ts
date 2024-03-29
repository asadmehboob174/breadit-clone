import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubredditSubscriptionValidator } from "@/lib/validators/subreddits";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { subredditId } = SubredditSubscriptionValidator.parse(body)
    const subscrioptionExist = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session.user.id
      }
    });

    if (!subscrioptionExist) {
      return new Response('You are not subscribed to this subreddit', { status: 400 })
    }

    //check if user is the creator of the subreddit
    const subreddit = await db.subreddit.findFirst({
      where: {
        id: subredditId,
        creatorId: session.user.id
      }
    })

    if (subreddit) {
      return new Response('You cant unsubscribe your own subreddit', { status: 400 })
    }

    await db.subscription.delete({
      where: {
        userId_subredditId: {
          userId: session.user.id,
          subredditId
        }
      }
    })

    return new Response(subredditId)
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request data passed', { status: 422 })
    }

    return new Response('Could not unsubscribe, please try again', { status: 500 })
  }
}