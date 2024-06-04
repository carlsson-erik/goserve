
INSERT INTO public.dashboard ("name","rows","cols")
VALUES ('Test dashboard', 4, 6);

INSERT INTO public.template ("name","data","width","height")
values('Bookmark', '() => {
    const [count, setCount] = React.useState(0)
    
    const siteName = getVariable("title")? getVariable("title") : "No title"
    const url = getVariable("url")
    
    return(<div className="h-full w-full flex justify-center items-center"> <a href={url}>{siteName} </a></div>
    )
}',2,1);

INSERT INTO public.variable ("name","value","default","template_id")
values ('title','Youtube','Default title', 1);

INSERT INTO public.variable ("name","value","default","template_id")
values ('url','https://youtube.com','example.com', 1);

INSERT INTO public.tile ("name","row","col", "width", "height","template_id", "dashboard_id")
values ('Youtube bookmark',0,0,2,1,1,1);

INSERT INTO public.variable ("name","value","default","tile_id")
values ('title','Youtube','Default title',1);

INSERT INTO public.variable ("name","value","default","tile_id")
values ('url','https://youtube.com','example.com', 1);

