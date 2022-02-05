import React, {
    useEffect,
    useRef,
    useState,
    forwardRef,
    useImperativeHandle
} from 'react';

let currentPosition = null;

function ContextMenu({
    getMenu,
    onClose
}, ref) {

    const [visible, setVisible] = useState(false)
    const [menu, setMenu] = useState([])

    const cref = useRef();

    useImperativeHandle(ref, () => ({
        show: (pos, menu) => {
            setVisible(false)
            setMenu(getMenu())
            //setAxis({ x: ev.clientX, y: ev.clientY, _tmp: Math.random() });
            currentPosition = { x: pos.clientX, y: pos.clientY };
            setVisible(true);
        },
        hide: () => {
            currentPosition = null;
            setVisible(false);
        }
    }))

    useEffect(() => {
        if(visible){
            cref?.current?.addEventListener('contextmenu', e => e.preventDefault());
            const clickX = currentPosition.x;
            const clickY = currentPosition.y;
            const screenW = window.innerWidth;
            const screenH = window.innerHeight;
            const rootW = cref?.current?.offsetWidth;
            const rootH = cref?.current?.offsetHeight;
            const right = (screenW - clickX) > rootW;
            const left = !right;
            const top = (screenH - clickY) > rootH;
            const bottom = !top;
            if(cref && cref.current){
                if (right) {
                    cref.current.style.left = `${clickX + 5}px`;
                }
                if (left) {
                    cref.current.style.left = `${clickX - rootW - 5}px`;
                }
                if (top) {
                    cref.current.style.top = `${clickY + 5}px`;
                }
                if (bottom) {
                    cref.current.style.top = `${clickY - rootH - 5}px`;
                }
                cref.current.style.opacity = 1;
            }
            window.document.body.addEventListener("click", () => {
                onClose && onClose()
                setVisible(false)
            })
        }

        return () => {
            cref?.current?.removeEventListener('contextmenu', e => e.preventDefault());
        }
    }, [visible])

    return (
        visible ? <div ref={cref} className={`context-menu fixed`}>
            {menu
            .filter(x => x.status === true)
            .map(item => item.label == "__line__" ? <div className="_line" /> : <div key={`menu-item-${item.id}`} className={`context-item rel`}>
                <button onClick={item.on} className={`s13 flex aic font`}>
                    <div className={`ico icon-${item.icon} s18 nope`}>
                        <span className="path1"></span><span className="path2"></span>
                    </div>
                    {item.label}
                </button>
            </div>)}
        </div> : null
    );
}

export default forwardRef(ContextMenu);