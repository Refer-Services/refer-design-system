import { Separator } from "@/registry/refer/ui/separator"

export function TypographyDemo() {
  return (
    <div>
      <p className="text-muted-foreground mb-2 text-xs tracking-widest uppercase">
        Sizes
      </p>
      <p className="text-4xl">
        The quick brown fox jumps over the lazy dog.{" "}
        <span className="text-muted-foreground bg-muted rounded rounded-sm px-1 text-xs">
          4xl - 36px
        </span>
      </p>
      <p className="text-3xl">
        The quick brown fox jumps over the lazy dog.{" "}
        <span className="text-muted-foreground bg-muted rounded rounded-sm px-1 text-xs">
          3xl - 30px
        </span>
      </p>
      <p className="text-2xl">
        The quick brown fox jumps over the lazy dog.{" "}
        <span className="text-muted-foreground bg-muted rounded rounded-sm px-1 text-xs">
          2xl - 24px
        </span>
      </p>
      <p className="text-xl">
        The quick brown fox jumps over the lazy dog.{" "}
        <span className="text-muted-foreground bg-muted rounded rounded-sm px-1 text-xs">
          xl - 20px
        </span>
      </p>
      <p className="text-lg">
        The quick brown fox jumps over the lazy dog.{" "}
        <span className="text-muted-foreground bg-muted rounded rounded-sm px-1 text-xs">
          lg - 18px
        </span>
      </p>
      <p className="text-base">
        The quick brown fox jumps over the lazy dog.{" "}
        <span className="text-muted-foreground bg-muted rounded rounded-sm px-1 text-xs">
          md - 16px
        </span>
      </p>
      <p className="text-sm">
        The quick brown fox jumps over the lazy dog.{" "}
        <span className="text-muted-foreground bg-muted rounded rounded-sm px-1 text-xs">
          sm - 14px
        </span>
      </p>
      <p className="text-xs">
        The quick brown fox jumps over the lazy dog.{" "}
        <span className="text-muted-foreground bg-muted rounded rounded-sm px-1 text-xs">
          xs - 12px
        </span>
      </p>

      <p className="text-muted-foreground mt-6 mb-2 text-xs tracking-widest uppercase">
        Font wheight
      </p>
      <p className="text-sm font-normal">
        The quick brown fox jumps over the lazy dog.{" "}
        <span className="text-muted-foreground bg-muted rounded rounded-sm px-1 text-xs font-normal">
          font-normal - 400
        </span>
      </p>
      <p className="text-sm font-medium">
        The quick brown fox jumps over the lazy dog.{" "}
        <span className="text-muted-foreground bg-muted rounded rounded-sm px-1 text-xs font-normal">
          font-medium - 500
        </span>
      </p>
      <p className="text-sm font-semibold">
        The quick brown fox jumps over the lazy dog.{" "}
        <span className="text-muted-foreground bg-muted rounded rounded-sm px-1 text-xs font-normal">
          font-semibold - 550 (Edit to variable)
        </span>
      </p>
      <p className="text-sm font-bold">
        The quick brown fox jumps over the lazy dog.{" "}
        <span className="text-muted-foreground bg-muted rounded rounded-sm px-1 text-xs font-normal">
          font-bold - 700
        </span>
      </p>

      <p className="text-muted-foreground mt-6 mb-2 text-xs tracking-widest uppercase">
        Leading
      </p>
      <p className="bg-positive-subtle mb-0.5 text-sm leading-none">
        The quick brown fox jumps over the lazy dog.{" "}
        <span className="text-positive text-xs font-normal">
          leading-none 1 - 100%
        </span>
      </p>
      <p className="bg-positive-subtle mb-0.5 text-sm leading-tight">
        The quick brown fox jumps over the lazy dog.{" "}
        <span className="text-positive text-xs font-normal">
          leading-tight 1.25 - 125%
        </span>
      </p>
      <p className="bg-positive-subtle mb-0.5 text-sm leading-snug">
        The quick brown fox jumps over the lazy dog.{" "}
        <span className="text-positive text-xs font-normal">
          leading-snug 1.375 - 137,5%
        </span>
      </p>
      <p className="bg-positive-subtle mb-0.5 text-sm leading-normal">
        The quick brown fox jumps over the lazy dog.{" "}
        <span className="text-positive text-xs font-normal">
          leading-normal 1.5 - 150%
        </span>
      </p>
      <p className="bg-positive-subtle mb-0.5 text-sm leading-relaxed">
        The quick brown fox jumps over the lazy dog.{" "}
        <span className="text-positive text-xs font-normal">
          leading-relaxed 1.625 - 162,5%
        </span>
      </p>
      <p className="bg-positive-subtle mb-0.5 text-sm leading-loose">
        The quick brown fox jumps over the lazy dog.{" "}
        <span className="text-positive text-xs font-normal">
          leading-loose 2 - 200%
        </span>
      </p>

      <p className="text-muted-foreground mt-6 mb-2 text-xs tracking-widest uppercase">
        Tracking
      </p>
      <p className="text-sm tracking-tighter">
        The quick brown fox jumps over the lazy dog.{" "}
        <span className="text-muted-foreground bg-muted rounded rounded-sm px-1 text-xs font-normal tracking-normal">
          tracking-tighter -5%
        </span>
      </p>
      <p className="text-sm tracking-tight">
        The quick brown fox jumps over the lazy dog.{" "}
        <span className="text-muted-foreground bg-muted rounded rounded-sm px-1 text-xs font-normal tracking-normal">
          tracking-tight -2,5%
        </span>
      </p>
      <p className="text-sm tracking-normal">
        The quick brown fox jumps over the lazy dog.{" "}
        <span className="text-muted-foreground bg-muted rounded rounded-sm px-1 text-xs font-normal tracking-normal">
          tracking-normal
        </span>
      </p>
      <p className="text-sm tracking-wide">
        The quick brown fox jumps over the lazy dog.{" "}
        <span className="text-muted-foreground bg-muted rounded rounded-sm px-1 text-xs font-normal tracking-normal">
          tracking-wide 2,5%
        </span>
      </p>
      <p className="text-sm tracking-wider">
        The quick brown fox jumps over the lazy dog.{" "}
        <span className="text-muted-foreground bg-muted rounded rounded-sm px-1 text-xs font-normal tracking-normal">
          tracking-wider 5%
        </span>
      </p>
      <p className="text-sm tracking-widest">
        The quick brown fox jumps over the lazy dog.{" "}
        <span className="text-muted-foreground bg-muted rounded rounded-sm px-1 text-xs font-normal tracking-normal">
          tracking-widest 10%
        </span>
      </p>

      <Separator className="my-4" />

      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        The Joke Tax Chronicles
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Once upon a time, in a far-off land, there was a very lazy king who
        spent all day lounging on his throne. One day, his advisors came to him
        with a problem: the kingdom was running out of money.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        The King's Plan
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        The king thought long and hard, and finally came up with{" "}
        <a
          href="#"
          className="text-primary font-medium underline underline-offset-4"
        >
          a brilliant plan
        </a>
        : he would tax the jokes in the kingdom.
      </p>
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        "After all," he said, "everyone enjoys a good joke, so it's only fair
        that they should pay for the privilege."
      </blockquote>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        The Joke Tax
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        The king's subjects were not amused. They grumbled and complained, but
        the king was firm:
      </p>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>1st level of puns: 5 gold coins</li>
        <li>2nd level of jokes: 10 gold coins</li>
        <li>3rd level of one-liners : 20 gold coins</li>
      </ul>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        As a result, people stopped telling jokes, and the kingdom fell into a
        gloom. But there was one person who refused to let the king's
        foolishness get him down: a court jester named Jokester.
      </p>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Jokester's Revolt
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Jokester began sneaking into the castle in the middle of the night and
        leaving jokes all over the place: under the king's pillow, in his soup,
        even in the royal toilet. The king was furious, but he couldn't seem to
        stop Jokester.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        And then, one day, the people of the kingdom discovered that the jokes
        left by Jokester were so funny that they couldn't help but laugh. And
        once they started laughing, they couldn't stop.
      </p>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        The People's Rebellion
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        The people of the kingdom, feeling uplifted by the laughter, started to
        tell jokes and puns again, and soon the entire kingdom was in on the
        joke.
      </p>
      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="even:bg-muted m-0 border-t p-0">
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                King's Treasury
              </th>
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                People's happiness
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="even:bg-muted m-0 border-t p-0">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Empty
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Overflowing
              </td>
            </tr>
            <tr className="even:bg-muted m-0 border-t p-0">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Modest
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Satisfied
              </td>
            </tr>
            <tr className="even:bg-muted m-0 border-t p-0">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Full
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Ecstatic
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        The king, seeing how much happier his subjects were, realized the error
        of his ways and repealed the joke tax. Jokester was declared a hero, and
        the kingdom lived happily ever after.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        The moral of the story is: never underestimate the power of a good laugh
        and always be careful of bad ideas.
      </p>
    </div>
  )
}
