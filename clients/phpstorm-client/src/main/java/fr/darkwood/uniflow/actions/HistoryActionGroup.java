package fr.darkwood.uniflow.actions;

import com.intellij.openapi.actionSystem.ActionGroup;
import com.intellij.openapi.actionSystem.AnAction;
import com.intellij.openapi.actionSystem.AnActionEvent;
import fr.darkwood.uniflow.Settings;
import fr.darkwood.uniflow.models.Api;
import fr.darkwood.uniflow.models.History;
import org.apache.commons.lang.StringUtils;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;

public class HistoryActionGroup extends ActionGroup {
    private AnAction[] actionList = null;

    @NotNull
    @Override
    public AnAction[] getChildren(@Nullable AnActionEvent e) {
        if(this.actionList == null) {
            return new AnAction[]{};
        }

        return this.actionList;
    }

    @Override
    public void update(AnActionEvent e) {
        Settings settings = Settings.getInstance(e.getProject());
        if(settings.apiKey == null || StringUtils.isBlank(settings.apiKey)) {
            super.update(e);
            return;
        }

        Api api = new Api(settings.env, settings.apiKey);

        if(!settings.autoloadHistory && this.actionList != null) {
            super.update(e);
            return;
        }

        try {
            ArrayList<AnAction> actions = new ArrayList<AnAction>();

            ArrayList<History> list = api.getHistory();
            for(Iterator<History> it = list.iterator(); it.hasNext();) {
                History history = it.next();

                actions.add(new ExecuteFlowAction(api, history));
            }

            AnAction[] arr = new AnAction[actions.size()];
            this.actionList = actions.toArray(arr);
        } catch (IOException e1) {
            e1.printStackTrace();
        }

        super.update(e);
    }
}
