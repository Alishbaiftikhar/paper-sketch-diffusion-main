import copy from "copy-to-clipboard";
import { Copy as CopyIcon, PlusCircle as PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import Loader from "components/loader";
import axios from 'axios';

export default function Predictions({ initialPrompt,predictions, submissionCount }) {
  const scrollRef = useRef(null);
  const [prompt, setPrompt] = useState(initialPrompt);

  useEffect(() => {
    if (submissionCount > 0) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [predictions, submissionCount]);

  if (submissionCount === 0) return null;

  const sendres = (data) => {
    console.log("in");
    console.log(data);
    setPrompt(localStorage.getItem("value-prompt"))
    console.log(prompt);
    const urlParams=new URLSearchParams(window.location.search);
    const myParam = urlParams.get('designerid');
    console.log(myParam);
    const res = axios.post("https://vdesigners.herokuapp.com/api/project/", {
      image: data,
      projectName: prompt,
      designerId:"63960869b6e5bd10f6d1979d"
    });

    console.log("response" + res.data);
  };

  return (
    <section className="w-full my-10">
      <h2 className="text-center text-3xl font-bold m-6">Results</h2>

      {submissionCount > Object.keys(predictions).length && (
        <div className="pb-10 mx-auto w-full text-center">
          <div className="pt-10" ref={scrollRef} />
          <Loader />
        </div>
      )}

      {Object.values(predictions)
        .slice()
        .reverse()
        .map((prediction, index) => (
          <Fragment key={prediction.id}>
            {index === 0 &&
              submissionCount === Object.keys(predictions).length && (
                <div ref={scrollRef} />
              )}
            <Prediction
              prediction={prediction}
              sendres={sendres}
              initialPrompt={initialPrompt}
            />
          </Fragment>
        ))}
    </section>
  );
}

export function Prediction({
  prediction,
  showLinkToNewScribble = false,
  sendres,
  initialPrompt,
}) {
  const [linkCopied, setLinkCopied] = useState(false);

  const copyLink = () => {
    const url =
      window.location.origin +
      "/scribbles/" +
      (prediction.uuid || prediction.id); // if the prediction is from the Replicate API it'll have `id`. If it's from the SQL database, it'll have `uuid`
    copy(url);
    setLinkCopied(true);
  };

  // Clear the "Copied!" message after 4 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLinkCopied(false);
    }, 4 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (!prediction) return null;
  return (
    <div className="mt-6 mb-12">
      <div className="shadow-lg border my-5 p-5 bg-white flex">
        <div className="w-1/2 aspect-square relative border">
          <img
            src={prediction.input.image}
            alt="input scribble"
            className="w-full aspect-square"
          />
        </div>
        <div className="w-1/2 aspect-square relative">{prediction.output?.length ? (sendres(prediction.output[prediction.output.length - 1])):(console.log("123"))}
          {prediction.output?.length ? (
            <img
              src={prediction.output[prediction.output.length - 1]}
              alt="output image"
              className="w-full aspect-square"
            />
          ) : (
            <div className="grid h-full place-items-center">
              <Loader />
            </div>
          )}
        </div>
      </div>
      <div className="text-center px-4 opacity-60 text-xl">
        &ldquo;{prediction.input.prompt}&rdquo;
      </div>
      <div className="text-center py-2">
        <button className="lil-button" onClick={copyLink}>
          <CopyIcon className="icon" />
          {linkCopied ? "Copied!" : "Copy link"}
        </button>

        {showLinkToNewScribble && (
          <Link href="/">
            <button className="lil-button" onClick={copyLink}>
              <PlusCircleIcon className="icon" />
              Create a new scribble
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
