#!/usr/bin/env sh

set -e

trap 'kill_server; trap - EXIT; exit' EXIT INT HUP TERM

kill_server() {
    if [ -n "${spid}" ]; then
        echo "Killing server..."
        kill -9 "${spid}"
    fi
}

main() {
    [ ! -d "page" ] && exit 1

    build

    [ "${1}" = "-s" ] && serve
}

serve() {
    python3 -m http.server 7392 -d "docs" & spid=$!
    sleep 2

    lso=$(command ls -l --time=mtime --full-time page/*)
    while true; do
        lso_check="$(command ls -l --time=mtime --full-time page/*)"
        if [ ! "${lso}" = "${lso_check}" ]; then
            build
            lso="${lso_check}"
        fi
        sleep 1
    done
}

build() {
    echo "Building..."
    rm -rf docs/items docs/index.html
    mkdir -p docs/items
    make_index
    make_aboutme
    make_articles_and_projects
}

make_index() {
    echo "$(cat page/head.template)
        <main class='menu'>
        <a href='./items/projects/projects.html'>Projects</a><br>
        <a href='./items/articles/articles.html'>Articles</a><br>
        <a href='./items/aboutme.html'>About me</a><br>
        ·<br>
        <a href='https://github.com/pablos123'>GitHub</a><br>
        $(cat page/tail.template)" > docs/index.html

    sed -i 's@SHARED_DIR@./shared@;s@BACK_BUTTON@@' docs/index.html
}

make_aboutme() {
    echo "$(cat page/head.template)
        <main class='article'>
        $(pandoc -f markdown -t html5 page/items/aboutme.md)
        $(cat page/tail.template)" > docs/items/aboutme.html

    sed -i 's@SHARED_DIR@../shared@;s@BACK_BUTTON@../index.html@' docs/items/aboutme.html
}

make_articles_and_projects() {
    for d in projects articles; do
        mkdir -p "docs/items/${d}"

        menu_page="$(cat page/head.template)<main class='menu'>"

        for i in "page/items/${d}/"*; do
            title=$(head -1 "${i}" | tr -d '#')
            i=$(basename "${i}")

            echo "$(cat page/head.template)
                <main class='article'>
                $(pandoc -f markdown -t html5 "page/items/${d}/${i}")
                $(cat page/tail.template)" > "docs/items/${d}/${i}.html"

            sed -i "s@SHARED_DIR@../../shared@;s@BACK_BUTTON@./${d}.html@" "docs/items/${d}/${i}.html"

            menu_page="${menu_page}<a href='./${i}.html'>${title}</a><br>"
        done

        echo "${menu_page}
            $(cat page/tail.template)" > "docs/items/${d}/${d}.html"

        sed -i 's@SHARED_DIR@../../shared@;s@BACK_BUTTON@../../index.html@' "docs/items/${d}/${d}.html"
    done
}

main "$@"
