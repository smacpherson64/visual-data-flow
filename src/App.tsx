import * as React from "react";
import { classNames } from "./utils";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomBitSet() {
  return getRandomInt(300000000000, 500000000000).toString(2);
}

export const Screen = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => (
  <div
    {...props}
    className="relative bg-gray-50 min-h-screen w-full overflow-auto"
  >
    <div className="relative pt-6 pb-16 sm:pb-24">
      <main className="mt-16 mx-auto max-w-3xl px-4 sm:mt-24">{children}</main>
    </div>
  </div>
);

export const Section = ({
  children,
  header,
  ...props
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) => (
  <section
    {...props}
    className="mt-16 border-l-8 border-green-200 pl-8 relative"
  >
    <header>{header}</header>
    {children}
  </section>
);

export function Callout(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      className="flex justify-center align-center p-8 space-x-4"
    />
  );
}

export function Toggle({
  children,
  checked,
  ...props
}: React.HTMLProps<HTMLInputElement>) {
  return (
    <label
      className={classNames(
        "rounded-md shadow flex items-center justify-center p-8 py-3 border border-transparent text-base font-medium rounded-md text-white md:py-4 md:text-lg md:px-10 cursor-pointer",
        checked
          ? "bg-green-800 hover:bg-green-900"
          : "bg-green-500 hover:bg-green-700"
      )}
    >
      {children}
      <input {...props} type="checkbox" checked={checked} className="sr-only" />
    </label>
  );
}

export function Button({
  color = undefined,
  ...props
}: React.HTMLProps<HTMLButtonElement> & { color?: string }) {
  return (
    <button
      {...props}
      type="button"
      className={classNames(
        "rounded-md shadow flex items-center justify-center p-8 py-3 border border-transparent text-base font-medium rounded-md text-white md:py-4 md:text-lg md:px-10",
        color ? color : "bg-green-500 hover:bg-green-700"
      )}
    />
  );
}

export default function App() {
  const [bits, setBits] = React.useState(getRandomBitSet());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setBits(getRandomBitSet());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Screen>
      <div className="text-center">
        <h1 className="text-5xl tracking-tight font-extrabold text-gray-900 md:text-6xl">
          <span className="block">Visual Example</span>
          <span className="block text-green-600">Data Flows</span>
        </h1>
        <p className="text-left mt-6 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-12 md:text-xl md:max-w-xl">
          Eric Normand's Lispcast is epic. He discusses technical papers and
          concepts related to software. On his episode{" "}
          <a
            href="https://lispcast.com/what-if-data-is-a-really-bad-idea/"
            className="underline text-green-600 hover:text-green-700"
            rel="noreferrer"
            target="_blank"
          >
            What if data is really a bad idea?
          </a>{" "}
          , he walks through a converstion between Rich Hickey and Alan Kay from
          Hackernews. The conversaton and video left me with wanting to dig
          deeper to visually see how the perspectives
          play out.
        </p>
        <p className="text-left text-xs mt-5 max-w-md mx-auto text-gray-500 md:mt-5 md:max-w-xl md:text-base">
          Please note:{" "}
          <strong>
            the representation below is not attempting to faithfully describe
            the process of how data is transmitted.
          </strong>{" "}
          It is an attempt to show how data requires interpretation and context.
        </p>
      </div>

      <Section
        header={
          <div className="py-4">
            <div className="font-bold text-gray-700">Signal of Bits (data)</div>
            <div className="text-gray-500">
              A bit stream of 0s and 1s on the hardware is the data. The data
              would be difficult to interpret at this point. The context is
              unknown.
            </div>
          </div>
        }
      >
        <div className="w-full max-w-2xl pb-4">
          <div
            className="w-full overflow-hidden text-xl font-thin font-mono"
            aria-hidden
          >
            {bits}
          </div>
          <div className="sr-only">
            A visual of a random set of constantly changing bits.
          </div>
        </div>
      </Section>

      <Section
        header={
          <div className="py-4">
            <div className="font-bold text-gray-700">
              Signal of Bits (data) -&gt; Selection of Bits (data)
            </div>
            <div className="text-gray-500">
              A program retrieves this data from the hardware. The group of bits
              is inbound <strong>data</strong> for the program. Assuming it
              retrieves a result it can understand, the program can transform
              this inbound data into outbound data. The program has an internal
              context of what this data is. From outside of the context of the
              program it would be difficult to interpret the data.
            </div>
          </div>
        }
      >
        <div>
          <div className="w-full max-w-2xl text-xl font-thin font-mono flex">
            <div className="py-1 text-gray-300">101</div>
            <div className="py-1 bg-green-200">
              01000001111110001011110000010000
            </div>
            <div className="py-1 text-gray-300">001</div>
          </div>
        </div>
      </Section>

      <Section
        header={
          <div className="py-4">
            <div className="font-bold text-gray-700">
              Selection of Bits (data) -&gt; Floating Point Number (data)
            </div>
            <div className="text-gray-500">
              The program converts the bits from hardware into a floating point
              number. It's inbound data is bits and its outbound data is a
              floating point number. It doesn't provide any context of what this
              number represents.
            </div>
            <div className="text-gray-500 mt-5">
              At this point, another program or a person could recognize this
              number, but since the context is unclear it would be difficult to
              use. (E.G.: Is this a Height? Width? Distance? Coordinate?)
            </div>
          </div>
        }
      >
        <div className="w-full max-w-2xl text-xl font-thin font-mono flex">
          <div className="py-1">31.091827392578125</div>
        </div>
      </Section>

      <Section
        header={
          <div className="py-4">
            <div className="font-bold text-gray-700">
              Floating Point Number (data) -&gt; API Response (data)
            </div>
            <div className="text-gray-500">
              The API pulls the value from an SDK (inbound data) for a
              temperature sensor. The API has the context of knowing this sensor
              returns a temperature in Celsius at a specific location. Outbound
              it builds up a response to send to program requesting the data. It
              provides this context in the response. At this point, the context
              around what the data is, is becoming concrete and easier to
              interpret "correctly" by different sources.
            </div>
          </div>
        }
      >
        <div className="w-full max-w-2xl font-thin font-mono flex">
          <pre className="py-1">
            {JSON.stringify(
              {
                value: "31.091827392578125",
                unit: "C",
                location: "Kansas City"
              },
              null,
              2
            )}
          </pre>
        </div>
      </Section>

      <Section
        header={
          <div className="py-4">
            <div className="font-bold text-gray-700">
              API Response (data) -&gt; HTML (data)
            </div>
            <div className="text-gray-500">
              The response from the api (inbound data) gets converted to HTML.
              At this point the data has been prepared to be represented
              visually.
            </div>
          </div>
        }
      >
        <div className="w-full max-w-2xl font-thin font-mono flex">
          <pre className="py-1">
            {`<h1>Kansas City</h1>
<div>88°F (31°C)</div>
              `}
          </pre>
        </div>
      </Section>

      <Section
        header={
          <div className="py-4">
            <div className="font-bold text-gray-700">
              HTML (data) -&gt; Visual(data)
            </div>
            <div className="text-gray-500">
              The browser then converts the html (inbound data) into a visual
              (outbound data). At this point an english speaking person could
              read page as inbound data.
            </div>
          </div>
        }
      >
        <div className="w-full max-w-2xl">
          <div className="border p-10">
            <h1 className="font-bold text-2xl">Kansas City</h1>
            <div className="text-2xl font-thin">88°F (31°C)</div>
          </div>
        </div>
      </Section>

      <Section
        header={
          <div className="py-4">
            <div className="font-bold text-gray-700">
              Visual(data) -&gt; Sweater Weather? (data)
            </div>
            <div className="text-gray-500">
              The user can then take this visual (inbound data) and make a
              decision about it.
            </div>
          </div>
        }
      >
        <div className="w-full max-w-2xl">
          <div className="text-2xl">
            It's too hot for a sweater...{" "}
            <span role="img" aria-label="Way too hot!">
              🥵
            </span>
          </div>
        </div>
      </Section>

      <Section
        header={
          <div className="py-4">
            <div className="font-bold text-gray-700">
              Sweater Weather?(data) -&gt; ...
            </div>
            <div className="text-gray-500">
              The user can then take this visual (inbound data) and make a
              decision about it. The data doesn't end here, the user can
              interpret the inbound data and broadcast new outbound data to
              their friends, family, followers, or anyone they like, using an
              assortment of different mediums.
            </div>
          </div>
        }
      >
        <div className="w-full max-w-2xl">
          <div className="text-gray-500"></div>
          <div className="text-2xl mt-3">
            <span
              role="img"
              aria-label="Examples of visual mediums people could use to describe"
            >
              💬📙🎥📸🗞📟📡🔦👕🗿
            </span>
          </div>
        </div>
      </Section>
    </Screen>
  );
}
