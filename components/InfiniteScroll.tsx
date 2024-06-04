"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

function InfiniteScroll({
  country,
  category,
}: {
  country: string;
  category: string;
}) {
  const [offset, setOffset] = useState(0);
  const [cellData, setCellData] = useState<News[]>([
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
    {
      author: "TMZ Staff",
      title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
      description:
        'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
      url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
      source: "TMZ.com",
      image:
        "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
      category: "general",
      language: "en",
      country: "us",
      published_at: "2020-08-05T05:47:24+00:00",
    },
  ]);
  const [isPending, startTransition] = useTransition();
  const newsRef = useRef(null);
  const loadingRef = useRef(null);
  const contentRef = useRef(null);

  const loadingInView = useInView(loadingRef, { once: true });
  const newsInView = useInView(newsRef, { once: true });

  async function loadMoreResult() {}
  useEffect(() => {
    if (loadingRef) {
      loadMoreResult();
    }
  }, [loadingRef]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const controls = useAnimation();
  const item = {
    hidden: {
      opacity: 0,
      y: 50,
      transition: { ease: [0.78, 0.14, 0.15, 0.86] },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: { ease: [0.78, 0.14, 0.15, 0.86] },
    },
  };

  useEffect(() => {
    if (newsInView) {
      controls.start("show");
    }
  }, [controls, newsInView]);

  useEffect(() => {
    if (contentRef) {
      controls.start("show");
    }
  }, [controls, contentRef]);

  return (
    <div className="flex flex-col">
      <motion.div
        className="z-0 sm:mx-auto gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
        initial="hidden"
        animate="show"
        variants={container}
        ref={contentRef}
      >
        <motion.div
          className="flex flex-col h-80 w-full sm:w-72 hover:sm:w-[294px] xl:w-64 hover:xl:w-[260px] hover:h-[324px] overflow-hidden gap-x-2  bg-white/10 rounded-2xl  transition-all duration- relative group/news hover:cursor-pointer"
          variants={item}
          initial="hidden"
          animate={controls}
          ref={newsRef}
        >
          {/* Image */}
          <Card className="col-span-12 sm:col-span-4  w-full shrink-0 relative h-[60%]">
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="https://nextui.org/images/card-example-4.jpeg"
            />
            <CardHeader className="absolute   flex-col items-start from-black to-transparent  bg-gradient-to-b h-full ">
              <p className="text-tiny text-white/60  font-bold">
                Hurricane Hanna makes landfall around 5 p.m. on Saturday
              </p>
            </CardHeader>
          </Card>
          {/* Description */}
          <div className="absolute top-[50%] h-full bg-black mt-1 space-y-1 flex flex-col  justify-start p-4">
            <span className="text-gray-400 text-sm ">Author · 13hour ago</span>
            <h4 className="text-white font-extralight text-sm group-hover/news:line-clamp-4 line-clamp-5">
              Minim adipisicing est ea pariatur mollit qui aliqua laborum
              aliquip sint cillum. Irure quis exercitation occaecat ad aute
              culpa sit. Commodo nostrud sunt labore dolore veniam sint duis
              nisi consectetur. Officia duis qui eiusmod ex culpa exercitation
              aliqua nisi sunt do est nostrud. Non qui ad excepteur dolor id
              voluptate proident cupidatat. Proident pariatur reprehenderit ea
              magna aute ea eiusmod.
            </h4>
          </div>

          {/* Read More */}
          <div className="absolute bottom-0 group-hover/news:flex  bg-gray-300 group-news/hover:h-6 w-full text-zinc-900 hidden justify-center items-center text-center font-bold text-sm">
            Read More
          </div>
        </motion.div>{" "}
        <motion.div
          className="flex flex-col h-80  sm:w-72 hover:sm:w-[294px] xl:w-64 hover:xl:w-[260px] hover:h-[324px] overflow-hidden gap-x-2  bg-white/10 rounded-2xl  transition-all duration- relative group/news hover:cursor-pointer"
          variants={item}
          initial="hidden"
          animate={controls}
          ref={newsRef}
        >
          {/* Image */}
          <Card className="col-span-12 sm:col-span-4  w-full shrink-0 relative h-[60%]">
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="https://nextui.org/images/card-example-4.jpeg"
            />
            <CardHeader className="absolute   flex-col items-start from-black to-transparent  bg-gradient-to-b h-full ">
              <p className="text-tiny text-white/60  font-bold">
                Hurricane Hanna makes landfall around 5 p.m. on Saturday
              </p>
            </CardHeader>
          </Card>
          {/* Description */}
          <div className="absolute top-[50%] h-full bg-black mt-1 space-y-1 flex flex-col  justify-start p-4">
            <span className="text-gray-400 text-sm ">Author · 13hour ago</span>
            <h4 className="text-white font-extralight text-sm group-hover/news:line-clamp-4 line-clamp-5">
              Minim adipisicing est ea pariatur mollit qui aliqua laborum
              aliquip sint cillum. Irure quis exercitation occaecat ad aute
              culpa sit. Commodo nostrud sunt labore dolore veniam sint duis
              nisi consectetur. Officia duis qui eiusmod ex culpa exercitation
              aliqua nisi sunt do est nostrud. Non qui ad excepteur dolor id
              voluptate proident cupidatat. Proident pariatur reprehenderit ea
              magna aute ea eiusmod.
            </h4>
          </div>

          {/* Read More */}
          <div className="absolute bottom-0 group-hover/news:flex  bg-gray-300 group-news/hover:h-6 w-full text-zinc-900 hidden justify-center items-center text-center font-bold text-sm">
            Read More
          </div>
        </motion.div>{" "}
        <motion.div
          className="flex flex-col h-80  sm:w-72 hover:sm:w-[294px] xl:w-64 hover:xl:w-[260px] hover:h-[324px] overflow-hidden gap-x-2  bg-white/10 rounded-2xl  transition-all duration- relative group/news hover:cursor-pointer"
          variants={item}
          initial="hidden"
          animate={controls}
          ref={newsRef}
        >
          {/* Image */}
          <Card className="col-span-12 sm:col-span-4  w-full shrink-0 relative h-[60%]">
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="https://nextui.org/images/card-example-4.jpeg"
            />
            <CardHeader className="absolute   flex-col items-start from-black to-transparent  bg-gradient-to-b h-full ">
              <p className="text-tiny text-white/60  font-bold">
                Hurricane Hanna makes landfall around 5 p.m. on Saturday
              </p>
            </CardHeader>
          </Card>
          {/* Description */}
          <div className="absolute top-[50%] h-full bg-black mt-1 space-y-1 flex flex-col  justify-start p-4">
            <span className="text-gray-400 text-sm ">Author · 13hour ago</span>
            <h4 className="text-white font-extralight text-sm group-hover/news:line-clamp-4 line-clamp-5">
              Minim adipisicing est ea pariatur mollit qui aliqua laborum
              aliquip sint cillum. Irure quis exercitation occaecat ad aute
              culpa sit. Commodo nostrud sunt labore dolore veniam sint duis
              nisi consectetur. Officia duis qui eiusmod ex culpa exercitation
              aliqua nisi sunt do est nostrud. Non qui ad excepteur dolor id
              voluptate proident cupidatat. Proident pariatur reprehenderit ea
              magna aute ea eiusmod.
            </h4>
          </div>

          {/* Read More */}
          <div className="absolute bottom-0 group-hover/news:flex  bg-gray-300 group-news/hover:h-6 w-full text-zinc-900 hidden justify-center items-center text-center font-bold text-sm">
            Read More
          </div>
        </motion.div>{" "}
        {cellData?.map((data: News, index: number) => {
          return (
            <>
              <motion.div
                className="flex flex-col h-80  sm:w-72 hover:sm:w-[294px] xl:w-64 hover:xl:w-[260px] hover:h-[324px] overflow-hidden gap-x-2  bg-white/10 rounded-2xl  transition-all duration- relative group/news hover:cursor-pointer"
                variants={item}
                initial="hidden"
                animate={controls}
                ref={newsRef}
              >
                {/* Image */}
                <Card className="col-span-12 sm:col-span-4  w-full shrink-0 relative h-[60%]">
                  <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-cover"
                    src="https://nextui.org/images/card-example-4.jpeg"
                  />
                  <CardHeader className="absolute   flex-col items-start from-black to-transparent  bg-gradient-to-b h-full ">
                    <p className="text-tiny text-white/60  font-bold">
                      Hurricane Hanna makes landfall around 5 p.m. on Saturday
                    </p>
                  </CardHeader>
                </Card>
                {/* Description */}
                <div className="absolute top-[50%] h-full bg-black mt-1 space-y-1 flex flex-col  justify-start p-4">
                  <span className="text-gray-400 text-sm ">
                    Author · 13hour ago
                  </span>
                  <h4 className="text-white font-extralight text-sm group-hover/news:line-clamp-4 line-clamp-5">
                    Minim adipisicing est ea pariatur mollit qui aliqua laborum
                    aliquip sint cillum. Irure quis exercitation occaecat ad
                    aute culpa sit. Commodo nostrud sunt labore dolore veniam
                    sint duis nisi consectetur. Officia duis qui eiusmod ex
                    culpa exercitation aliqua nisi sunt do est nostrud. Non qui
                    ad excepteur dolor id voluptate proident cupidatat. Proident
                    pariatur reprehenderit ea magna aute ea eiusmod.
                  </h4>
                </div>

                {/* Read More */}
                <div className="absolute bottom-0 group-hover/news:flex  bg-gray-300 group-news/hover:h-6 w-full text-zinc-900 hidden justify-center items-center text-center font-bold text-sm">
                  Read More
                </div>
              </motion.div>{" "}
            </>
          );
        })}
      </motion.div>
      <div
        className="h-16 mt-5 flex justify-center items-center"
        ref={loadingRef}
      >
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#183B7E]"></div>
      </div>
    </div>
  );
}

export default InfiniteScroll;
