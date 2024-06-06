<script lang='ts'>
    let publishDate: Date = new Date();
    let name: String = "Ninja Demon";
</script>

<footer>
    <div class="left">
        <address>
            <ul>
                <li>Name: <a href="https://en.wikipedia.org/wiki/Doraemon">{name}</a></li>
                <li>Published on: {publishDate}</li>
            </ul>
        </address>
    </div>
</footer>

<style>
    footer {
        background-color: beige;
        color: dimgray;
        height: 150px;
    }
</style>
