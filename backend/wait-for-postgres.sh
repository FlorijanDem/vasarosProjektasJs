#!/usr/bin/env bash

host="$1"
shift
cmd="$@"

until nc -z "$host" 5432; do
  >&2 echo "🕒 Waiting for PostgreSQL at $host:5432..."
  sleep 2
done

>&2 echo "✅ PostgreSQL is up - executing command"
exec $cmd
