#! /bin/bash
# usage: bash generatechapters.sh 101 7 
# to generate 7 chapters for book 101

bookid=$1
numberofchapters=$2
i=1
for i in `seq 1 $numberofchapters`; do
  echo "sed s/xxx/$bookid/ dummychapter.md|sed s/nnn/$i/>$bookid-$i.md"
  sed s/xxx/$bookid/ dummychapter.md|sed s/nnn/$i/>$bookid-$i.md
done
 