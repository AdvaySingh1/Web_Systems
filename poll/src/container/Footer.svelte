<script lang='ts'>
    let publishDate: Date = new Date();
    let name: String = "Ninja Demon";
</script>

<footer>
    <div class="copyright">
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
        color: darkblue;
        height: 150px;
        padding: 40px;
        text-align: center;
    }

    .copyright{
        color: #775a5a;
        font-size: 14px;
        display: inline-block;
        padding: 20px;
        border-top: 1px solid #ddd;
    }
    ul {
        list-style-type: none;
    }
</style>
