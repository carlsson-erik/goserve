
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




INSERT INTO public.template ("name","data","width","height")
values('graph', '() => {
    const data = [
        {
            name: "Page A",
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    return (
        <recharts.ResponsiveContainer width= "100%" height = "100%" >
            <recharts.LineChart
          width={ 500 }
    height = { 300}
    data = { data }
    margin = {{
        top: 5,
            right: 30,
                left: 20,
                    bottom: 5,
          }
}
        >
    <recharts.CartesianGrid strokeDasharray="3 3" />
        <recharts.XAxis dataKey="name" />
            <recharts.YAxis />
            <recharts.Tooltip />
            <recharts.Legend />
            <recharts.Line type = "monotone" dataKey = "pv" stroke = "#8884d8" activeDot = {{ r: 8 }} />
                <recharts.Line type = "monotone" dataKey = "uv" stroke = "#82ca9d" />
                    </recharts.LineChart>
                    < /recharts.ResponsiveContainer>
    );
  
}',2,1);

INSERT INTO public.tile ("name","row","col", "width", "height","template_id", "dashboard_id")
values ('Graph',1,3,2,1,2,1);
