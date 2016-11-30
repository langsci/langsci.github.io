#! /bin/sh
bookid=$1
series=$2

echo "---
layout: book 
bookseries: $series
bookid: $bookid
permalink: book/$bookid
---"> $bookid.md
